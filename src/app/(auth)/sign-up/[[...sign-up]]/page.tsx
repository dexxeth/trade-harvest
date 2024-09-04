import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
	return (
		<main className="custom-gradient flex h-screen w-full items-center justify-center shadow-lg">
			<SignUp />
		</main>
	);
};

export default SignUpPage;
