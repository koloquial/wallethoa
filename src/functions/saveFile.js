export const saveFile = (filename, data) => {
    const a = document.createElement('a');
    const type = filename.split(".").pop();
    a.href = URL.createObjectURL( new Blob([JSON.stringify(data)], { type:`text/${type === "txt" ? "plain" : type}` }) );
    a.download = filename;
    a.click();
};