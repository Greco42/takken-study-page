document.addEventListener('DOMContentLoaded', () => {
    const quizItems = document.querySelectorAll('.quiz-item');

    quizItems.forEach(quizItem => {
        const choices = quizItem.querySelectorAll('.choices li');
        const explanation = quizItem.querySelector('.explanation');

        choices.forEach(choice => {
            choice.addEventListener('click', () => {
                // 回答済みの問題は処理しない
                if (quizItem.classList.contains('answered')) {
                    return;
                }
                quizItem.classList.add('answered');

                const isCorrect = choice.getAttribute('data-correct') === 'true';

                if (isCorrect) {
                    choice.classList.add('correct');
                } else {
                    choice.classList.add('incorrect');
                    // 不正解の場合、正解の選択肢も表示
                    const correctChoice = quizItem.querySelector('.choices li[data-correct="true"]');
                    correctChoice.classList.add('correct');
                }

                // 全ての選択肢をクリック不可に
                choices.forEach(c => c.classList.add('disabled'));

                // 解説を表示
                if (explanation) {
                    explanation.style.display = 'block';
                }
            });
        });
    });
});