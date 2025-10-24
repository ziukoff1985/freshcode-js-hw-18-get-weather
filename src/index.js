'use strict';

import { createFormElements } from './createForm.js';
import { setupSubmitForm } from './submitForm.js';
import { setupEmailValidation } from './validateEmail.js';

createFormElements();

setupEmailValidation('input[name="email"]');

setupSubmitForm();
