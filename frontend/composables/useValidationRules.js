function cpfCalcChecker1(firstNineDigits) {
    var sum = null;

    for (var j = 0; j < 9; ++j) {
        sum += firstNineDigits.toString().charAt(j) * (10 - j);
    }

    var lastSumChecker1 = sum % 11;
    var checker1 = lastSumChecker1 < 2 ? 0 : 11 - lastSumChecker1;
    return checker1;
}

function cpfCalcChecker2(cpfWithChecker1) {
    var sum = null;

    for (var k = 0; k < 10; ++k) {
        sum += cpfWithChecker1.toString().charAt(k) * (11 - k);
    }

    var lastSumChecker2 = sum % 11;
    var checker2 = lastSumChecker2 < 2 ? 0 : 11 - lastSumChecker2;
    return checker2;
}

export const useValidationRules = () => {
    const cpfRule = (value) => {
        var cleanCPF = value.replace(/[^\d]/g, '');
        var firstNineDigits = cleanCPF.substring(0, 9);
        var checker = cleanCPF.substring(9, 11);
        var result = false;

        for (var i = 0; i < 10; i++) {
            if (firstNineDigits + checker === Array(12).join(i)) {
                return false;
            }
        }

        var checker1 = cpfCalcChecker1(firstNineDigits);
        var checker2 = cpfCalcChecker2("".concat(firstNineDigits).concat(checker1));

        if (checker.toString() === checker1.toString() + checker2.toString()) {
            result = true;
        } else {
            result = false;
        }
        return result;
    };

    const requiredRule = (value) => {
        return !!value;
    };

    const emailRule = (value) => {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return pattern.test(value);
    };

    const numberRule = (value) => {
        const pattern = /^\d+$/;
        return pattern.test(value);
    };

    return {
        cpfRule,
        requiredRule,
        emailRule,
        numberRule
    };
};