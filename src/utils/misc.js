export function parseFirebaseError(errorMesssage) {
    return capitalize(
        errorMesssage
            .replace("Firebase: Error", "")
            .replaceAll("-", " ")
            .replace("(", "")
            .replace(")", "")
            .replace("auth/", "")
            .trim()
    );
}

function capitalize(str) {
    console.log("str", str);
    console.log("str", typeof str);
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    console.log("capitalized", capitalized);

    return capitalized;
}
