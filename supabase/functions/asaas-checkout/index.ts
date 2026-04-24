import "@supabase/functions-js/edge-runtime.d.ts"

const ASAAS_API_KEY = Deno.env.get('ASAAS_API_KEY');
// LINK DE PRODUÇÃO (OFICIAL):
const ASAAS_API_URL = "https://api.asaas.com/v3"; 

const PLANS = {
  start: { baseEmp: 10, basePrice: 129.0, extraPrice: 10.0, yearlyMultiplier: 12, name: "Start" },
  sync:  { baseEmp: 20, basePrice: 189.0, extraPrice: 7.0,  yearlyMultiplier: 10, name: "Sync" }, 
  flow:  { baseEmp: 30, basePrice: 219.0, extraPrice: 4.0,  yearlyMultiplier: 10, name: "Flow" }  
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { name, email, cpfCnpj, planKey, employeesCount, cycle } = await req.json();
    const plan = PLANS[planKey as keyof typeof PLANS];
    if (!plan) throw new Error("Plano inválido.");

    let monthlyValue = plan.basePrice;
    if (employeesCount > plan.baseEmp) {
      monthlyValue += (employeesCount - plan.baseEmp) * plan.extraPrice;
    }

    let finalValue = monthlyValue;
    let billingType = 'UNDEFINED'; 

    if (cycle === 'YEARLY') {
      finalValue = monthlyValue * plan.yearlyMultiplier;
      billingType = 'PIX'; 
    }

    // 1. CRIA O CLIENTE NO ASAAS
    const customerRes = await fetch(`${ASAAS_API_URL}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'access_token': ASAAS_API_KEY! },
      body: JSON.stringify({ name, email, cpfCnpj })
    });
    const customerData = await customerRes.json();
    if (!customerData.id) throw new Error(customerData.errors?.[0]?.description || "Erro ao criar cliente no Asaas");

    // 2. CRIA A ASSINATURA COM REDIRECIONAMENTO AUTOMÁTICO
    const subRes = await fetch(`${ASAAS_API_URL}/subscriptions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'access_token': ASAAS_API_KEY! },
      body: JSON.stringify({
        customer: customerData.id,
        billingType: billingType,
        value: finalValue,
        nextDueDate: new Date().toISOString().split('T')[0], 
        cycle: cycle, 
        description: `Dotweb - Plano ${plan.name} (${employeesCount} colaboradores)`,
        // AQUI ESTÁ A REGRA DE REDIRECIONAMENTO CORRIGIDA
        callback: {
          successUrl: "https://dotweb.app.br",
          autoRedirect: true
        }
      })
    });
    const subData = await subRes.json();
    if (!subData.id) throw new Error(subData.errors?.[0]?.description || "Erro ao gerar assinatura no Asaas");

    // 3. LOOP DE TENTATIVAS PARA PEGAR O LINK
    let invoiceUrl = null;
    for (let i = 0; i < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const paymentsRes = await fetch(`${ASAAS_API_URL}/payments?subscription=${subData.id}`, {
        method: 'GET',
        headers: { 'access_token': ASAAS_API_KEY! }
      });
      const paymentsData = await paymentsRes.json();
      
      if (paymentsData.data && paymentsData.data.length > 0 && paymentsData.data[0].invoiceUrl) {
        invoiceUrl = paymentsData.data[0].invoiceUrl;
        break;
      }
    }

    if (!invoiceUrl) {
      throw new Error("Assinatura criada, mas o Asaas demorou para liberar o link. Verifique seu painel.");
    }

    return new Response(
      JSON.stringify({ paymentUrl: invoiceUrl }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { 
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 
    });
  }
});