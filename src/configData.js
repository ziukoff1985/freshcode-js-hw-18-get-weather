const inputConfigData = [
    {
        type: 'text',
        name: 'firstName',
        placeholder: 'First name',
        autocomplete: 'on',
    },
    {
        type: 'text',
        name: 'lastName',
        placeholder: 'Last name',
        required: true,
    },
    {
        type: 'text',
        name: 'nickName',
        placeholder: 'Nick name',
    },
    {
        type: 'email',
        name: 'email',
        placeholder: 'Email address',
        autocomplete: 'on',
    },
    {
        type: 'password',
        name: 'password',
        placeholder: 'Password',
    },
    {
        type: 'password',
        name: 'passwordConfirmation',
        placeholder: 'Password confirmation',
    },
];

const radioConfigData = [
    {
        id: 'buyer',
        label: 'Join As a Buyer',
        paragraphText:
            'I`m looking for a Name, Logo or Tagline for my business, brand or product',
    },
    {
        id: 'seller',
        label: 'Join As a Creative or Marketplace Seller',
        paragraphText:
            'I plan to submit name ideas, Logo designs or sell names in Domain Marketplace',
    },
];

export { inputConfigData, radioConfigData };
