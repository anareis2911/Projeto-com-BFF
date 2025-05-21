 
const modal = document.getElementById("novaPoupancaModal");
 
document.addEventListener("DOMContentLoaded", listarPoupancas);
 
function abrirModal() {
  modal.style.display = "flex";
}
 
function fecharModal() {
  modal.style.display = "none";
}
 
function listarPoupancas() {
fetch("http://localhost:3001/api/poupancas")
    .then(res => res.json())
    .then(data => {
      const lista = document.getElementById("listaPoupanca");
      lista.innerHTML = "";
      data.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <span>R$ ${parseFloat(p.valor).toFixed(2)}</span>
          <span>${p.data}</span>
          <button>Ver detalhes</button>
        `;
        lista.appendChild(card);
      });
    });
}
 
function criarPoupanca() {
  const valor = document.getElementById("valor").value;
  const dataAtual = new Date().toISOString().split("T")[0];
 
  if (!valor) {
    alert("Preencha o valor.");
    return;
  }
 
  fetch("http://localhost:3001/api/poupancas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      valor: parseFloat(valor),
      data: dataAtual
    })
  })
  .then(() => {
    fecharModal();
    listarPoupancas();
    document.getElementById("valor").value = "";
  });
}
 