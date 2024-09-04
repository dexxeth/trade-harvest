import { SignIn } from "@clerk/nextjs";
import Logo from "@/components/logo";
const SignInPage = () => {
	return (
		<main className="custom-gradient flex h-screen w-full items-center justify-center shadow-lg">
			<div>
				<SignIn />
			</div>
		</main>
	);
};

export default SignInPage;
