export async function waitForProductImage() {
    return new Promise<void>((resolve) => {
        const interval = setInterval(() => {
            if (checkImageReady('img[data-testid="product-img"]')) {
                clearInterval(interval);
                clearTimeout(timeout);
                console.log('FOUND');
                resolve();
            }
        });

        const timeout = setTimeout(() => {
            clearInterval(interval);
            console.log('TIMEOUT');
            resolve();
        }, 10000);
    });
}

function checkImageReady(specificSelector?: string) {
    const img = document.querySelector(specificSelector || 'img') as HTMLImageElement | null;
    return img?.complete;
}
