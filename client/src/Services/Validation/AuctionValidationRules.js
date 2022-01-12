export default function AuctionValidationRules(values) {
    let errors = {};
    const minTitleLength = 3;
    const minDescriptionLength = 10;
    const minStartPrice = 1;
    const minStep = 1;

    if (!values.title) {
        errors.title = "Title is required";
    } else if (values.title.length < minTitleLength) {
        errors.title =
            "Title must be " + minTitleLength + " or more characters";
    }

    if (!values.description) {
        errors.description = "Description is required";
    } else if (values.description.length < minDescriptionLength) {
        errors.description =
            "Description must be " + minDescriptionLength + " or more characters";
    }

    if (!values.price) {
        errors.price = "Start price is required";
    } else if (values.price < minStartPrice) {
        errors.price = "Start price must be " + minStartPrice + " or more";
    }

    if (!values.minStep) {
        errors.minStep = "Min step is required";
    } else if (values.step < minStep) {
        errors.minStep = "Min step must be " + minStep + " or more";
    }

    if (!values.endTime) {
        errors.endTime = "End time is required";
    } else if (new Date(values.endTime).getTime() < Date.now()) {
        errors.endTime = "End time must be in future";
    }

    if (!values.category) {
        errors.category = "Category is required";
    }

    return errors;
}
