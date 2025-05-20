document.addEventListener("DOMContentLoaded", () => {
    const images = Array.from(document.querySelectorAll(".gallery img"));
    const lightbox = document.getElementById("lightbox");
    const imgElement = document.getElementById("lightbox-img");
    const counter = document.getElementById("counter");
    const total = document.getElementById("total");
    const btnClose = document.getElementById("btnClose");
    const btnFullscreen = document.getElementById("btnFullscreen");
    const btnZoom = document.getElementById("btnZoom");
    const btnShare = document.getElementById("btnShare");
    const btnPrev = document.getElementById("prevImg");
    const btnNext = document.getElementById("nextImg");

    let currentIndex = 0;
    let zoomed = false;
    let userRequestedExit = false;

    images.sort((a, b) => Number(a.alt) - Number(b.alt));
    total.textContent = images.length;

    images.forEach((img, index) => {
        img.addEventListener("click", () => {
            const rect = img.getBoundingClientRect();
            const clone = img.cloneNode();
            Object.assign(clone.style, {
                position: "fixed",
                top: rect.top + "px",
                left: rect.left + "px",
                width: rect.width + "px",
                height: rect.height + "px",
                transition: "all 0.4s ease",
                zIndex: "10001",
                objectFit: "contain"
            });
            document.body.appendChild(clone);

            requestAnimationFrame(() => {
                Object.assign(clone.style, {
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "90vw",
                    height: "auto"
                });
            });

            const newImg = new Image();
            newImg.src = img.src;
            newImg.onload = () => {
                currentIndex = index;
                imgElement.style.display = "none";
                imgElement.src = newImg.src;
                imgElement.alt = newImg.alt;
                counter.textContent = index + 1;
                imgElement.style.transform = "scale(1)";
                zoomed = false;

                lightbox.classList.remove("hidden");
                document.body.style.overflow = "hidden";
                imgElement.style.display = "";
                document.body.removeChild(clone);
            };
        });
    });

    function showImage(index) {
        const img = images[index];
        const newImg = new Image();
        newImg.src = img.src;
        imgElement.style.display = "none";

        newImg.onload = () => {
            imgElement.src = newImg.src;
            imgElement.alt = newImg.alt;
            counter.textContent = index + 1;
            imgElement.style.transform = "scale(1)";
            zoomed = false;
            btnZoom.innerHTML = '<i class="fa-solid fa-magnifying-glass-plus"></i>';
            imgElement.style.display = "";
        };
    }

    function changeImage(step) {
        currentIndex = (currentIndex + step + images.length) % images.length;
        showImage(currentIndex);
    }

    function closeLightbox() {
        lightbox.classList.add("hidden");
        document.body.style.overflow = "";
        zoomed = false;
        btnZoom.innerHTML = '<i class="fa-solid fa-magnifying-glass-plus"></i>';
        imgElement.style.transform = "scale(1)";
        if (document.fullscreenElement) {
            userRequestedExit = true;
            document.exitFullscreen();
        }
    }

    btnPrev.addEventListener("click", () => changeImage(-1));
    btnNext.addEventListener("click", () => changeImage(1));
    btnClose.addEventListener("click", closeLightbox);

    document.addEventListener("keydown", (e) => {
        if (lightbox.classList.contains("hidden")) return;
        if (e.key === "Escape" && document.fullscreenElement) {
            // No cerrar el visor, solo salir del fullscreen
            document.exitFullscreen();
        } else if (e.key === "Escape") {
            closeLightbox();
        }
        if (e.key === "ArrowRight") changeImage(1);
        if (e.key === "ArrowLeft") changeImage(-1);
    });

    btnFullscreen.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            lightbox.requestFullscreen().catch(console.error);
        } else {
            userRequestedExit = false;
            document.exitFullscreen();
        }
    });

    document.addEventListener("fullscreenchange", () => {
        const isFullscreen = !!document.fullscreenElement;

        btnFullscreen.innerHTML = isFullscreen
            ? '<i class="fa-solid fa-compress"></i>'
            : '<i class="fa-solid fa-expand"></i>';

        if (!isFullscreen) {
            if (!lightbox.classList.contains("hidden")) {
                document.body.style.overflow = "hidden";
            }

            if (userRequestedExit) {
                lightbox.classList.add("hidden");
                document.body.style.overflow = "";
                userRequestedExit = false;
            }
        }
    });

    btnZoom.addEventListener("click", () => {
        zoomed = !zoomed;
        imgElement.style.transform = zoomed ? "scale(2)" : "scale(1)";
        btnZoom.innerHTML = zoomed
            ? '<i class="fa-solid fa-magnifying-glass-minus"></i>'
            : '<i class="fa-solid fa-magnifying-glass-plus"></i>';
    });

    btnShare.addEventListener("click", async () => {
        try {
            await navigator.share({
                title: 'Imagen',
                text: 'Mira esta imagen:',
                url: imgElement.src
            });
        } catch (err) {
            alert("No se pudo compartir esta imagen.");
        }
    });
});
