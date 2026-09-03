/* =========================================
   BIRTHDAY SURPRISE - MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const startBtn =
        document.getElementById("startBtn");

    const transitionScreen =
        document.getElementById("transitionScreen");

    const bgMusic =
        document.getElementById("bgMusic");


    /* =========================================
       START SURPRISE BUTTON
    ========================================= */

    if (startBtn && transitionScreen) {

        startBtn.addEventListener("click", () => {

            /* Prevent multiple clicks */
            startBtn.disabled = true;


            /* =========================================
               START MUSIC
            ========================================= */

            if (bgMusic) {

                bgMusic.volume = 0.7;

                bgMusic.play()
                    .then(() => {

                        /* Remember that music has started */
                        localStorage.setItem(
                            "musicStarted",
                            "true"
                        );

                    })
                    .catch((error) => {

                        console.log(
                            "Music could not be played:",
                            error
                        );

                    });

            }


            /* =========================================
               SHOW TRANSITION SCREEN
            ========================================= */

            transitionScreen.classList.add("active");


            /* =========================================
               CHANGE TRANSITION MESSAGE
            ========================================= */

            setTimeout(() => {

                const title =
                    transitionScreen.querySelector("h2");

                const text =
                    transitionScreen.querySelector("p");


                if (title) {

                    title.textContent =
                        "Your journey is about to begin...";

                }


                if (text) {

                    text.textContent =
                        "Get ready ❤️";

                }

            }, 1200);


            /* =========================================
               GO TO SECRET PAGE
            ========================================= */

            setTimeout(() => {

                /*
                 * Save current music position
                 * before leaving this page.
                 */

                if (bgMusic) {

                    localStorage.setItem(
                        "musicTime",
                        bgMusic.currentTime
                    );

                }


                window.location.href =
                    "secret.html";

            }, 2800);

        });

    }


    /* =========================================
       SECRET LEVEL 01 - QUIZ LOGIC
    ========================================= */

    const unlockBtn = document.querySelector(".answer-box button");
    const answerInput = document.querySelector(".answer-box input");
    const messageDiv = document.getElementById("message");
    const successScreen = document.querySelector(".success-screen");
    const continueBtn = document.getElementById("continueBtn");

    // 🔴 আপনার আসল স্পেশাল তারিখটি এখানে লিখে পরিবর্তন করুন
    const CORRECT_ANSWER = "12/12/2024"; 

    if (unlockBtn && answerInput) {

        unlockBtn.addEventListener("click", () => {
            
            const userAnswer = answerInput.value.trim();

            if (userAnswer === CORRECT_ANSWER) {
                
                /* সঠিক উত্তর হলে */
                if (successScreen) {
                    successScreen.classList.add("active");
                }
                
                if (messageDiv) {
                    messageDiv.style.color = "#ff9edc";
                    messageDiv.textContent = "You remembered... ❤️";
                }
                
                answerInput.classList.remove("wrong");

            } else {
                
                /* ভুল উত্তর হলে ইনপুট বক্স কাঁপবে */
                answerInput.classList.add("wrong");
                
                if (messageDiv) {
                    messageDiv.style.color = "#ff5a78";
                    messageDiv.textContent = "Hmm... Try again! 👀";
                }
                
                /* অ্যানিমেশন শেষ হলে wrong ক্লাস রিমুভ করা হবে */
                setTimeout(() => {
                    answerInput.classList.remove("wrong");
                }, 450);
            }
        });

        /* এন্টার কি (Enter Key) প্রেস করলেও যেন সাবমিট হয় */
        answerInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                unlockBtn.click();
            }
        });
    }

    /* কুইজ সফল হওয়ার পর পরবর্তী পেজে যাওয়ার বাটন */
    if (continueBtn) {
        continueBtn.addEventListener("click", () => {
            window.location.href = "gift.html"; 
        });
    }


    /* =========================================
       RANDOMIZE EXISTING HEARTS
    ========================================= */

    const hearts =
        document.querySelectorAll(
            ".hearts span"
        );


    hearts.forEach((heart) => {

        const randomLeft =
            Math.random() * 95;

        heart.style.left =
            randomLeft + "%";

    });


    /* =========================================
       MOUSE MOVEMENT EFFECT
    ========================================= */

    const content =
        document.querySelector(".content");


    if (content) {

        document.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    (
                        event.clientX /
                        window.innerWidth -
                        0.5
                    ) * 8;


                const y =
                    (
                        event.clientY /
                        window.innerHeight -
                        0.5
                    ) * 8;


                content.style.transform =
                    `translate(${x}px, ${y}px)`;

            }
        );

    }


    /* =========================================
       CREATE FLOATING HEARTS
    ========================================= */

    function createHeart() {

        const heart =
            document.createElement("span");


        const symbols = [
            "❤️",
            "💕",
            "💖",
            "💗",
            "💞",
            "✨"
        ];


        heart.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        heart.style.position =
            "fixed";


        heart.style.left =
            Math.random() * 100 + "%";


        heart.style.bottom =
            "-30px";


        heart.style.fontSize =
            (12 + Math.random() * 18) + "px";


        heart.style.pointerEvents =
            "none";


        heart.style.zIndex =
            "2";


        heart.style.animation =
            `heartFloat ${
                7 + Math.random() * 6
            }s linear forwards`;


        const heartContainer =
            document.querySelector(".hearts");


        if (heartContainer) {

            heartContainer.appendChild(
                heart
            );

        }


        /* Remove after animation */

        setTimeout(() => {

            heart.remove();

        }, 13000);

    }


    /* =========================================
       CREATE HEARTS PERIODICALLY
    ========================================= */

    if (
        document.querySelector(".hearts")
    ) {

        setInterval(
            createHeart,
            1800
        );

    }


    /* =========================================
       BUTTON HOVER EFFECT
    ========================================= */

    if (startBtn) {

        startBtn.addEventListener(
            "mouseenter",
            () => {

                startBtn.style.transform =
                    "translateY(-4px) scale(1.03)";

            }
        );


        startBtn.addEventListener(
            "mouseleave",
            () => {

                startBtn.style.transform =
                    "translateY(0) scale(1)";

            }
        );

    }

});
