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
        const fileNameWithoutSpaces = file.name.replace(/\s+/g, '_');

        const listItem = document.createElement("li");
        const deleteButton = document.createElement("button");
        const downloadButton = document.createElement("a");

        const icon = document.createElement("i");
        if (file.type.includes("pdf")) {
            icon.className = "fas fa-file-pdf text-danger"; 
        } else if (file.type.includes("image")) {
            icon.className = "fas fa-file-image text-primary"; 
        } else if (file.type.includes("video")) {
            icon.className = "fas fa-file-video text-warning"; 
        } else {
            icon.className = "fas fa-file text-secondary"; 
        }

        listItem.appendChild(icon);

        const fileNameElement = document.createElement("span");
        fileNameElement.textContent = fileNameWithoutSpaces;
        listItem.appendChild(fileNameElement);

        downloadButton.textContent = "Descargar";
        downloadButton.href = URL.createObjectURL(file);
        downloadButton.setAttribute("download", fileNameWithoutSpaces);

        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", () => {
            listItem.remove();
        });

        listItem.appendChild(downloadButton);
        listItem.appendChild(deleteButton);
        fileList.appendChild(listItem);
    }
}
