function saveUsersToLocalStorage(users) {
    try {
        localStorage.setItem('crudUsers', JSON.stringify(users));
    } catch (error) {
        console.error('Erro ao salvar usuários no localStorage:', error);
    }
}

function getUsersFromLocalStorage() {
    try {
        const data = localStorage.getItem('crudUsers');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Erro ao ler usuários do localStorage:', error);
        return [];
    }
}

function saveFormDraft(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Erro ao salvar rascunho no localStorage:', error);
    }
}

function loadFormDraft(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Erro ao ler rascunho do localStorage:', error);
        return null;
    }
}

function clearFormDraft(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Erro ao limpar rascunho do localStorage:', error);
    }
}
