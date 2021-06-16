import { rule, shield } from "graphql-shield";

 const isAuthenticated = rule()((parent, args, { user }) => {
    return user !== null;
  });


  export default shield({
    Query: {
      
    }
  });