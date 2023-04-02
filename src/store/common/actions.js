import API from 'src/api/common';

export const SET_DATA = '[COMMON] SET DATA]';
export const SET_LOADING = '[COMMON] SET LOADING';

export const getServiceList = (data) => {
  return async (dispatch) => {
    const key = 'service_list';
    try {
      dispatch(setLoading(key, true));
      // await API.getServiceList(data);
      const data = [
        { label: 'Cleaning' },
        { label: 'Plumber' },
        { label: 'Mechanic' },
        { label: 'Plumber' },
        { label: 'Mechanic' },
        { label: 'Cleaning' },
        { label: 'Plumber' },
        { label: 'Mechanic' },
        { label: 'Plumber' },
      ];
      dispatch(setData(key, data));
    } catch (err) {
      console.error(err);
    }
    dispatch(setLoading(key, false));
  };
};

export const getHelpList = (data) => {
  return async (dispatch) => {
    const key = 'help_list';
    try {
      dispatch(setLoading(key, true));
      // await API.getServiceList(data);
      const data = [
        {
          id: '1',
          question: 'How does Zoom Errands work?',
          answer:
            ' An open-source starter kit that will help you build full-stack multi-tenant SaaS platforms efficiently and help you focus on developing your core SaaS features. Built on top of popular and modern technologies such as Next JS, Tailwind, Prisma, and Stripe',
        },
        {
          id: '2',
          question: 'How does Zoom Errands work?',
          answer:
            ' An open-source starter kit that will help you build full-stack multi-tenant SaaS platforms efficiently and help you focus on developing your core SaaS features. Built on top of popular and modern technologies such as Next JS, Tailwind, Prisma, and Stripe',
        },
        {
          id: '3',
          question: 'How does Zoom Errands work?',
          answer:
            ' An open-source starter kit that will help you build full-stack multi-tenant SaaS platforms efficiently and help you focus on developing your core SaaS features. Built on top of popular and modern technologies such as Next JS, Tailwind, Prisma, and Stripe',
        },
        {
          id: '4',
          question: 'How does Zoom Errands work?',
          answer:
            ' An open-source starter kit that will help you build full-stack multi-tenant SaaS platforms efficiently and help you focus on developing your core SaaS features. Built on top of popular and modern technologies such as Next JS, Tailwind, Prisma, and Stripe',
        },
        {
          id: '5',
          question: 'How does Zoom Errands work?',
          answer:
            ' An open-source starter kit that will help you build full-stack multi-tenant SaaS platforms efficiently and help you focus on developing your core SaaS features. Built on top of popular and modern technologies such as Next JS, Tailwind, Prisma, and Stripe',
        },
      ];
      dispatch(setData(key, data));
    } catch (err) {
      console.error(err);
    }
    dispatch(setLoading(key, false));
  };
};

export const setData = (key, data) => {
  return { type: SET_DATA, key, data };
};

export const setLoading = (key, loading) => {
  return { type: SET_LOADING, key, loading };
};
