document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    const mobileLinks = document.querySelectorAll(
        ".mobile-menu a"
    );

    const revealItems = document.querySelectorAll(
        ".reveal"
    );

    const year = document.getElementById("year");


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const handleScroll = () => {

        if (!header) return;

        if (window.scrollY > 35) {

            header.classList.add(
                "header-scrolled"
            );

        } else {

            header.classList.remove(
                "header-scrolled"
            );

        }
    };


    handleScroll();


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const closeMenu = () => {

        if (!mobileMenu) return;

        mobileMenu.classList.remove(
            "open"
        );

        document.body.classList.remove(
            "menu-open"
        );

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open menu"
            );
        }
    };


    const openMenu = () => {

        if (!mobileMenu) return;

        mobileMenu.classList.add(
            "open"
        );

        document.body.classList.add(
            "menu-open"
        );

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close menu"
            );
        }
    };


    menuToggle?.addEventListener(
        "click",
        () => {

            const isOpen =
                mobileMenu.classList.contains(
                    "open"
                );

            if (isOpen) {

                closeMenu();

            } else {

                openMenu();

            }
        }
    );


    /* CLOSE MENU WHEN LINK IS CLICKED */

    mobileLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        }
    );


    /* CLOSE MENU WITH ESCAPE */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                mobileMenu?.classList.contains("open")
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "is-visible"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );
                            }

                        }
                    );

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        revealItems.forEach(
            item => {

                revealObserver.observe(
                    item
                );

            }
        );

    } else {

        /* Fallback for older browsers */

        revealItems.forEach(
            item => {

                item.classList.add(
                    "is-visible"
                );

            }
        );

    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );

                        if (
                            !targetId ||
                            targetId === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {

                            return;

                        }


                        event.preventDefault();


                        const headerOffset =
                            window.innerWidth <= 768
                                ? 70
                                : 82;


                        const targetPosition =
                            target.getBoundingClientRect().top +
                            window.scrollY -
                            headerOffset;


                        window.scrollTo({

                            top:
                                targetPosition,

                            behavior:
                                "smooth"

                        });

                    }
                );

            }
        );


    /* =====================================================
       FAQ
    ===================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach(
        item => {

            item.addEventListener(
                "toggle",
                () => {

                    if (!item.open) {

                        return;

                    }


                    faqItems.forEach(
                        otherItem => {

                            if (
                                otherItem !== item &&
                                otherItem.open
                            ) {

                                otherItem.open =
                                    false;

                            }

                        }
                    );

                }
            );

        }
    );


    /* =====================================================
       MOBILE MENU CLOSE WHEN RESIZING
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900
            ) {

                closeMenu();

            }

        }
    );


});