const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
        
        const accordionItem = header.parentElement;
        const accordionContent = accordionItem.querySelector(".accordion-content");
        

        accordionContent.classList.toggle("active");
        

        document.querySelectorAll(".accordion-content").forEach((content) => {
            if (content !== accordionContent) {
                content.classList.remove("active");
                content.style.maxHeight = null;
            }
        });

        if (accordionContent.classList.contains("active")) {

            accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
        } else {

            accordionContent.style.maxHeight = "0";
        }
    });
});