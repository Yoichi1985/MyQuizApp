'use strict';
{
    $(function () {
        const question = document.getElementById('question');
        const choices = document.getElementById('choices');
        const btn = document.getElementById('btn');
        const result = document.getElementById('result');
        const scoreLabel = document.querySelector('#result > p');

        const quizSet = shuffle([
            { q: '世界で一番大きな湖は？', c: ['カスピ海', 'カリブ海', '琵琶湖'] },
            { q: '2の8乗は？', c: ['256', '64', '1024'] },
            { q: '次のうち、最初にリリースされた言語は？', c: ['Python', 'JavaScript', 'HTML'] },
        ]);

        let currentNum = 0;
        let isAnswered;
        let score = 0;

        function shuffle(arr) {
            //iは配列の最後要素
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1)); //ランダムに選ぶ要素をjにする
                [arr[j], arr[i]] = [arr[i], arr[j]];
            }
            return arr;
        }

        function checkAnswer(li) {
            // if (isAnswered === true) {
            if (isAnswered) {
                return;
            }
            isAnswered = true;

            if (li.textContent === quizSet[currentNum].c[0]) {
                li.classList.add('correct');
                score++;
            } else {
                li.classList.add('wrong');
            }

            btn.classList.remove('disabled');
        }

        function setQuiz() {
            isAnswered = false;
            question.textContent = quizSet[currentNum].q;

            while (choices.firstChild) {
                choices.removeChild(choices.firstChild);
            }

            const shufflechoices = shuffle([...quizSet[currentNum].c]);
            shufflechoices.forEach(choice => { //choiceに上の配列の一つづつが入ってくる
                const li = document.createElement('li');
                li.textContent = choice;
                // $('#choices').append(li);
                li.addEventListener('click', function () {
                    checkAnswer(li);
                });
                choices.appendChild(li);
            });

            if (currentNum === quizSet.length - 1) {
                btn.textContent = 'Show Score';
            }
        }

        setQuiz();

        btn.addEventListener('click', () => {
            if (btn.classList.contains('disabled')) {
                return;
            }
            btn.classList.add('disabled');

            if (currentNum === quizSet.length - 1) {
                // console.log(`Score: ${score} / ${quizSet.length}`);
                scoreLabel.textContent = ` ${score} / ${quizSet.length}`;
                result.classList.remove('hidden');
            } else {
                currentNum++;
                setQuiz();
            }
        });
    });
}