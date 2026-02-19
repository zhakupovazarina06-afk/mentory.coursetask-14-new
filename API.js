import {
  getPresents,
  getProducts,
  sendDelivery
} from './API.js';

import {
  createProductCards,
  createPresentsList,
  createReloadButton
} from './createDOM.js';

import { interactiveDOM } from './interactiveUI.js';

export async function getPresentsList() {
  const parent = document.querySelector('[data-fetching="presents"]');

  try {
    const presents = await getPresents();
    createPresentsList({ parent, presents });
  } catch {
    createReloadButton({
      parent,
      action: 'presents',
      text: 'Произошла ошибка загрузки данных, нажмите обновить'
    });
  }
}

export async function getRenderProducts() {
  const parent = document.querySelector('[data-fetching="products"]');

  try {
    const products = await getProducts();
    createProductCards({ parent, products });
  } catch {
    createReloadButton({
      parent,
      action: 'products',
      text: 'Произошла ошибка загрузки данных, нажмите обновить'
    });
  }
}

export async function sendDeliveryForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const deliveryData = {
    name: formData.get('name'),
    address: formData.get('address'),
    tel: formData.get('phone')
      .replace(/\s/g, '')
      .replace(/[()]/g, '')
  };

  const response = await sendDelivery(deliveryData);

  if (+response.id > 100) {
    const h4 = document.createElement('h4');
    h4.className = 'color-accent text-center';
    h4.textContent = 'Спасибо за заказ!';

    interactiveDOM.modal.actions.open({
      content: h4,
      timerMS: 10000
    });
  }
}
