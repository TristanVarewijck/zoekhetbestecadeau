export const scrollToElement = (elementId: string) => {
    // scroll to a specific element id
    const element = document.getElementById(elementId);
    // @ts-ignore
    element.scrollIntoView({ behavior: "smooth" }) as HTMLElement;
};
