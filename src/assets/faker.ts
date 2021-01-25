// http://marak.github.io/faker.js/

import * as faker from 'faker/locale/ru';

export const randomName = faker.name.findName(); // Rowan Nikolaus
export const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
export const randomCard = faker.helpers.createCard();
export const randomBoolean = faker.random.boolean();
