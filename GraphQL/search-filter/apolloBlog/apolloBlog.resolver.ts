const resolvers = {
  Query: {
    album(parent, args, context, info) {
      const { id } = args;
      return context.db.Albums.find((a) => a.id == id);
    },

    albums(parent, args, context, info) {
      const { genre } = args;
      return context.db.Albums.filter((a) => a.genre == genre);
    },
  },
};
