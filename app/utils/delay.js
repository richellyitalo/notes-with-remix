export async function delay(seconds = 2) {
    await new Promise((resolve, reject) => {
        setTimeout(() => resolve(), seconds * 1000);
    });
}
