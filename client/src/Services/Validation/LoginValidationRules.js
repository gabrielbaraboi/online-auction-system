export default function LoginValidationRules(values) {
    let errors = {};
    const minPasswordLength = 6;

    if (!values.email) {
        errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email address is invalid";
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < minPasswordLength) {
        errors.password =
            "Password must be " + minPasswordLength + " or more characters";
    }

    return errors;
}
