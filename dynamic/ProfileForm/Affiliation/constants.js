export const MAX_AFFILIATION = 3;
export const TEMPLATE = {
    country: '',
    city: '',
    affiliation: '',
    address: '',
    zip: ''
};

export const FIELDS = {
    country: {
        label: 'Country',
        required: true,
        errorMessage: {
            required:"Country is required"
        },
        default: '',
    },
    city: {
        label: 'City',
        required: true,
        errorMessage: {
            required:"City is required"
        },
        default: '',
    },
    affiliation: {
        label: 'Affiliation',
        required: true,
        errorMessage: {
            required:"Affiliation is required"
        },
        default: '',
    },
    address: {
        label: 'Address',
        required: true,
        errorMessage: {
            required:"Address is required"
        },
        default: '',
    },
    zip: {
        label: 'Zip',
        required: true,
        errorMessage: {
            required:"Zip is required"
        },
        default: '',
    },
}
