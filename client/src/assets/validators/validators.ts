import validator from 'validator';

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
    } else if(!/^[А-ЯЁа-яё\s]{7,30}$/.test(value)) {
        error = "Некоректно введне ім'я";
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