        function obterCarrinho() {
            const carrinhoJSON = localStorage.getItem('carrinho');
            return carrinhoJSON ? JSON.parse(carrinhoJSON) : [];
        }

        function salvarCarrinho(carrinho) {
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
        }
function atualizarCarrinhoModal() {
            const carrinho = obterCarrinho();
            const listaEl = document.getElementById('carrinho-lista');
            const subtotalEl = document.getElementById('carrinho-subtotal');

            if (!listaEl || !subtotalEl) return;

            listaEl.innerHTML = '';
            let subtotal = 0;

            carrinho.forEach(item => {
                subtotal += item.preco * item.qtd;

                listaEl.innerHTML += `
        <tr data-id="${item.id}">
          <td>
            <img src="${item.imagem}" alt="${item.nome}" style="width: 64px; border-radius: 4px;">
          </td>
          <td>${item.nome}</td>
          <td class="text-center">R$ ${item.preco.toFixed(2).replace('.', ',')}</td>
          <td class="text-center">
            <div class="d-flex align-items-center justify-content-center gap-2">
              <button class="btn btn-sm btn-outline-secondary" onclick="alterarQtd('${item.id}', -1)">–</button>
              <input type="text" class="form-control form-control-sm text-center" style="width: 50px;" value="${item.qtd}" disabled>
              <button class="btn btn-sm btn-outline-secondary" onclick="alterarQtd('${item.id}', 1)">+</button>
            </div>
          </td>
          <td class="text-center">
            <button class="btn btn-sm text-danger" onclick="removerItem('${item.id}')">
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      `;
            });

            subtotalEl.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
            atualizarCarrinhoBadge();
        }

        function atualizarCarrinhoBadge() {
            const carrinho = obterCarrinho();
            const badgeEl = document.getElementById('carrinho-badge');
            const totalItens = carrinho.reduce((soma, item) => soma + item.qtd, 0);

            if (badgeEl) {
                badgeEl.innerText = totalItens;
                badgeEl.style.display = totalItens > 0 ? 'inline-block' : 'none';
            }
        }

        function alterarQtd(id, delta) {
            let carrinho = obterCarrinho();
            const item = carrinho.find(prod => prod.id === id);
            if (!item) return;

            item.qtd = Math.max(1, item.qtd + delta); // nunca menos que 1
            salvarCarrinho(carrinho);
            atualizarCarrinhoModal();
        }

        function removerItem(id) {
            let carrinho = obterCarrinho();
            carrinho = carrinho.filter(item => item.id !== id);
            salvarCarrinho(carrinho);
            atualizarCarrinhoModal();
        }

        document.addEventListener('DOMContentLoaded', () => {
            atualizarCarrinhoModal();
            atualizarCarrinhoBadge();
        });
