/**
 * Pequeno wrapper sobre fetch() para chamar o BFF de vocabulário.
 *
 * O BFF responde com um array de objetos no formato:
 *   { word: string, description: string, useCase: string }
 *
 * Endpoint e método ficam fixos no App.jsx — sem tela de configuração.
 */
export async function askBff({ endpoint, method, signal }) {
  let response;
  try {
    response = await fetch(endpoint, { method, signal });
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new Error(
      "Não foi possível conectar ao BFF. Verifique a URL, o CORS do servidor ou sua conexão."
    );
  }

  if (!response.ok) {
    throw new Error(`O BFF respondeu com erro ${response.status} (${response.statusText}).`);
  }

  const data = await response.json();
  const list = Array.isArray(data) ? data : data?.words || data?.data || data?.result;

  if (!Array.isArray(list)) {
    throw new Error("A resposta do BFF não veio no formato esperado (array de palavras).");
  }

  return list.map((item, index) => ({
    id: `${item.word ?? "word"}-${index}`,
    word: item.word ?? "—",
    description: item.description ?? "",
    useCase: item.useCase ?? "",
  }));
}
