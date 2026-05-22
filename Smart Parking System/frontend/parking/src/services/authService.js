export const authService = {
  login: async (data) => {
    return {
      id: 1,
      name: "Shaju",
      email: data.email,
      role: "user",
    };
  },

  register: async (data) => {
    return data;
  },
};
