import { useQuery } from "@tanstack/react-query"
import { fetchMe } from "../../api/User"
import { queryClient } from "../../api/queryClient"
import { Loader } from "../Loader";
import { AuthForm } from "../AuthForm";
import { LogoutButton } from "../LogoutButton";
import { UserView } from "../UserView";
import { FetchNoteListView } from "../NotesListView/FetchNoteListView";
import './Account.css';

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
            return (
                <>
                    <div className="account-header">
                        <UserView username={accountQuery.data.username} />
                        <LogoutButton />
                    </div>
                    <FetchNoteListView />
                </>
            );
    }
}