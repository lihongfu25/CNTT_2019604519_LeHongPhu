const download = (data) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users.xlsx");
    document.body.appendChild(link);
    link.click();
};
export default download;
