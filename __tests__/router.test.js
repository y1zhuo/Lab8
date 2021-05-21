/**
 * @jest-environment jsdom
 */
import { pushToHistory } from "../scripts/router.js"


describe('testing pushToHistory', () => {

    test("initial state: state should be null", () => {
        expect(history.state).toBe(null);
        expect(history.length).toBe(1);
    })

    test("settings state", () => {
        pushToHistory("settings", 0);
        //expect(pushToHistory("settings", 0)).state.toBe("settings");
        expect(history.state.page).toBe("settings");
        expect(history.length).toBe(2);
    })

    test("entry state", () => {
        pushToHistory("entry", 3);
        expect(history.state.page).toBe("entry3");
        expect(history.length).toBe(3);
    })

    test("default state", () => {
        pushToHistory("", 0);
        expect(history.state.page).toBe(undefined);
        expect(history.length).toBe(4);
    })
});
