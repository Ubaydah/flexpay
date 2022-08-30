from django.contrib.auth import get_user_model, authenticate


class AuthService:
    @staticmethod
    def login_handler(email, password):
        try:
            user = get_user_model().objects.get(email=email)
        except get_user_model().DoesNotExist:
            raise ValueError("No active account with this details")

        if not user.check_password(password):
            raise ValueError("Invalid login credentials, try again")
        if user.is_active == False:
            raise ValueError("Account diabled, contact admin")

        return user
