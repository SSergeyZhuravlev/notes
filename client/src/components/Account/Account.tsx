import { useQuery } from "@tanstack/react-query"
import { fetchMe } from "../../api/User"
import { queryClient } from "../../api/queryClient"
import { Loader } from "../Loader";
import { AuthForm } from "../AuthForm";
import { AccountLayout } from "./AccountLayout";

export const Account = () => {
    const accountQuery = useQuery({
            queryFn: () => fetchMe(),
            queryKey: ['users', 'me'],
        },
        queryClient,
    );

    switch (accountQuery.status) {
        case 'pending': 
            return (
                <div className="auth-form">
                    <Loader />
                </div>
            );

        case 'error':
            return <AuthForm />;

        case 'success':
            return <AccountLayout username={accountQuery.data.username} id={accountQuery.data.id} />
    }
}