import { useMutation } from "@tanstack/react-query";
import { logout } from "../../api/User";
import { Button } from "../Button";
import "./LogoutButton.css";
import { queryClient } from "../../api/queryClient";
import { Loader } from "../Loader";

export const LogoutButton = () => {
  const logoutMutation = useMutation({
    mutationFn: logout,

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] })
    },
  },
  queryClient,
)

  return (
    <div className="logout-button">
      <Button 
        kind="secondary" 
        onClick={() => {
          logoutMutation.mutate();
        }}
        isLoading={logoutMutation.isPending}>
          Выйти
      </Button>
      
      { logoutMutation.isSuccess && <div className="auth-form"><Loader /></div> }
    </div>
  );
};
