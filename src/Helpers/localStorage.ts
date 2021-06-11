export const saveUser = <T extends undefined>(user: T): void => {
  try {
    if (user) {
      const serializedState = JSON.stringify(user);
      localStorage.setItem(
        "session",
        JSON.stringify({ token: user?.["token"] })
      );
      localStorage.setItem("canopySession", serializedState);
    }
  } catch {
    /* ignore */
  }
};

export const loadUser = <T extends undefined>(): T | undefined => {
  try {
    const serializedState = localStorage.getItem("canopySession");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveClientSelection = (clientList: PortfolioState): void => {
  try {
    if (clientList && getAuthrizationToken()) {
      localStorage.setItem("clientList", JSON.stringify(clientList));
    }
  } catch {
    /* ignore */
  }
};

export const loadClientSelection = (): PortfolioState | undefined => {
  try {
    const serializedState = localStorage.getItem("clientList");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const getAuthrizationToken = () => {
  try {
    return JSON.parse(localStorage?.getItem("session") || "")?.token;
  } catch (error) {
    return undefined;
  }
};

export const getAuthrizationHeaders = () => {
  let header: any = { authorization: getAuthrizationToken() };
  const switchUser = loadSwitchUser();
  if (switchUser && switchUser.id) {
    header = { ...header, "X-App-Switch-User": switchUser.id };
  }
  return header;
};

export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    return undefined;
  }
};

export const saveSwitchUser = (user: Record<string, string | number>): void => {
  try {
    if (getAuthrizationToken()) {
      const serializedState = user ? JSON.stringify(user) : user;
      localStorage.setItem("switchUser", serializedState);
    }
  } catch {
    /* ignore */
  }
};

export const loadSwitchUser = ():
  | Record<string, string | number>
  | undefined => {
  try {
    const serializedState = localStorage.getItem("switchUser");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const getSwitchUserId = (): number | undefined => {
  try {
    const serializedState = localStorage.getItem("switchUser");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState).id;
  } catch (error) {
    return undefined;
  }
};
