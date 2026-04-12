import "@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  try {
    // --- 🔐 TRAVA DE SEGURANÇA: CONFERÊNCIA DO TOKEN ---
    // O Asaas manda a senha dentro desse campo específico no cabeçalho
    const tokenRecebido = req.headers.get('asaas-access-token');
    // Pegamos a senha verdadeira que salvamos no cofre
    const tokenVerdadeiro = Deno.env.get('ASAAS_WEBHOOK_TOKEN');

    if (!tokenRecebido || tokenRecebido !== tokenVerdadeiro) {
      console.error("🚨 Tentativa de invasão bloqueada! Token inválido ou ausente.");
      // Devolve erro 401 (Não Autorizado) e barra a execução na mesma hora
      return new Response("Acesso Negado", { status: 401 });
    }
    // ----------------------------------------------------

    const payload = await req.json();
    const evento = payload.event; 
    
    const asaasCustomerId = payload.payment?.customer;

    if (!asaasCustomerId) {
       return new Response("Evento ignorado: Sem customer ID", { status: 200 });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // REGRA 1: PAGAMENTO RECEBIDO -> ATIVA A EMPRESA
    if (evento === 'PAYMENT_RECEIVED' || evento === 'PAYMENT_CONFIRMED') {
      console.log(`💰 Dinheiro na conta! Ativando empresa: ${asaasCustomerId}`);
      await supabase
        .from('companies')
        .update({ is_active: true })
        .eq('asaas_customer_id', asaasCustomerId); 

    // REGRA 2: PAGAMENTO VENCIDO -> BLOQUEIA A EMPRESA
    } else if (evento === 'PAYMENT_OVERDUE') {
      console.log(`🚨 Boleto vencido! Bloqueando empresa: ${asaasCustomerId}`);
      await supabase
        .from('companies')
        .update({ is_active: false })
        .eq('asaas_customer_id', asaasCustomerId);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error: any) {
    console.error("Erro no Webhook:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
});