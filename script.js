const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileListItems");

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("drag-over");
});

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("drag-over");
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("drag-over");
    const files = e.dataTransfer.files;
    handleFiles(files);
});

fileInput.addEventListener("change", () => {
    const files = fileInput.files;
    handleFiles(files);
});

function handleFiles(files) {
    for (const file of files) {
        const listItem = document.createElement("li");
        const deleteButton = document.createElement("button");
        const downloadButton = document.createElement("a");

        listItem.textContent = file.name;

        downloadButton.textContent = "Descargar";
        downloadButton.href = URL.createObjectURL(file);
        downloadButton.setAttribute("download", file.name);

        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", () => {
            listItem.remove();
        });

        listItem.appendChild(downloadButton);
        listItem.appendChild(deleteButton);
        fileList.appendChild(listItem);
    }
}
