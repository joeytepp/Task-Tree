# frozen_string_literal: true

module AuthHelper
  def create_new_user_from_params
    User.new(first_name: params[:firstName],
             last_name: params[:lastName],
             email: params[:email],
             password: params[:password],
             password_confirmation: params[:password],
             terms_of_service: params[:termsOfService])
  end

  def handle_validation_errors_for_sign_up(errors)
    formatted_errors = {}
    errors.map do |key, _|
      formatted_errors[key.to_s.camelize(:lower)] = "Please provide a valid #{key.to_s.sub '_', ' '}."
    end

    flash[:errors] = formatted_errors

    redirect_to "/signup"
  end

  def handle_email_not_unique
    flash[:errors] = { top: "An account already exists for this email. Please log in." }
    redirect_to "/login"
  end

  def handle_sign_up_exception
    flash[:errors] = { top: "An unexpected error occured. Please try again." }
    redirect_to "/signup"
  end

  def handle_invalid_credentials
    flash[:errors] = { top: "Invalid email or password." }
    redirect_to "/login"
  end
end
