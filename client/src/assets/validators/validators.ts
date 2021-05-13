import validator from 'validator';
import { CategoryNameType } from '../../types/stateTypes';

export const ValidateLogin = (value: string): string => {
    let error: string = '';
    if(!value) {
        error = "Логін обов'язковий";
    } else if(!validator.isAlphanumeric(value)) {
        error = "Лише літери та цифри";
    } else if(!validator.isLength(value, {min: 4, max: 12})) {
        error = "Довжина логіна від 4 до 12 символів";
    }
    return error;
}

export const ValidatePersonalName = (value: string): string => {
    let error: string = '';
    if(!value) {
        error = "Ім'я обов'язкове";
    } else if(value.length < 7 || value.length > 35) {
        error = "Довжина ім'я від 7 до 35 символів";
    } else if(!/^[А-Яа-яЁёЄєіІ ]+$/g.test(value)) {
        error = "Лише пробіли і літери рос./укр. абетки";
    }
    return error;
}

export const ValidateEmail = (value: string): string => {
    let error: string = '';
    if(!value) {
        error = "Пошта обов'язкова";
    } else if(!validator.isEmail(value)) {
        error = "Некоректно введна пошта";
    }
    return error;
}

export const ValidatePhone = (value: string): string => {
    let error: string = '';
    if(!value) {
        error = "Телефон обов'язковий";
    } else if(!validator.isMobilePhone(value, 'uk-UA')) {
        error = "+[код країни][номер] або лише [номер]";
    }
    return error;
}

export const ValidatePassword = (value: string): string => {
    let error: string = '';
    if(!value) {
        error = "Пароль обов'язковий";
    } else if(!/^[a-zA-Z0-9_]{7,20}$/.test(value)) {
        error = "Некоректно введений пароль";
    }
    return error;
}

export const ValidateRepeatPassword = (password: string, repeatPassword: string): string => {
    let error: string = '';
    if(password !== repeatPassword) {
        error = "Паролі не співпадають!";
    }
    return error;
}

export const ValidateName = (name: string): string => {
    let error: string = '';
    if(!name) {
        error = "Назва товару обов'язкова";
    }
    if(!validator.isLength(name, {min: 7, max: 35})) {
        error = "Довжина назви від 7 до 35 символів";
    }
    return error;
}

export const ValidateDescription = (description: string): string => {
    let error : string = '';
    if(!description) {
        error = "Опис товару обов'язковий";
    }
    if(!validator.isLength(description, {min: 35, max: 200})) {
        error = "Довжина опису від 35 до 200 символів";
    }
    return error;
}

export const ValidateProductAmount = (amount: string): string => {
    let error: string = '';
    if(!validator.isInt(amount)) {
        error = "Кількість товарів - це ціле число";
    }
    if(Number(amount) < 0 || Number(amount) > 30) {
        error = "Кількість товарів у межах від 0 до 30";
    }
    return error;
}

export const ValidateProductSize = (size: string): string => {
    let error: string = '';
    const mass: Array<string> = size.split("x");

    if(mass.length !== 2) {
        error = "Приклад формату даних - 1000x1000";
        return error;
    }
    if(!validator.isInt(mass[0]) || !validator.isInt(mass[1])) {
        error = "Зліва або справа від x записано не число";
        if(Number(mass[0]) < 1 || Number(mass[1]) < 1) {
            error = "Розмір одного з габаритів менше 1";
        }
    }

    return error;
}

// export const ValidateProductCategory = (category: string): string => {
//     let error: string = '';
//     const keys: CategoryNameType;

//     if(!category) {
//         error = 'Заповніть категорію';
//     }

//     if(category in keys) {
//         error = 'Категорія має бути представле';
//     }

//     return error;
// }
