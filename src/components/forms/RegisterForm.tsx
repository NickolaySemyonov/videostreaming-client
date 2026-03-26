import { useForm, type SubmitHandler } from "react-hook-form";
import type { IAuthRequest } from "../../api/dto";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../../api/requests";

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function RegisterForm() {
  const { register, handleSubmit, formState } = useForm<IAuthRequest>({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IAuthRequest> = async (data) => {
    try {
      const result = await registerRequest(data);
      console.log("Registration successful:", result);
      setTimeout(() => {
        navigate("/me");
      }, 100);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  const emailError = formState.errors.email?.message;
  const passwordError = formState.errors.password?.message;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="email"
          placeholder="enter email"
          {...register("email", {
            required: "email is required",
            pattern: {
              value: EMAIL_PATTERN,
              message:
                "Please enter a valid email address (e.g., name@example.com)",
            },
          })}
        />
        {emailError && <p style={{ color: "tomato" }}>{emailError}</p>}
      </div>
      <div>
        <input
          type="password"
          placeholder="enter password"
          {...register("password", { required: "password is required" })}
        />
        {passwordError && <p style={{ color: "tomato" }}>{passwordError}</p>}
      </div>

      <input type="submit" />
    </form>
  );
}
