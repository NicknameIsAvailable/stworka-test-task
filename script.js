fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const checklistContainer = document.getElementById('checklistContainer');

        data.forEach((checklist, checklistIndex) => {
            const checklistDiv = document.createElement('div');
            checklistDiv.classList.add('check-list');

            const containerDiv = document.createElement('div');
            containerDiv.classList.add('check-list__container');

            const progressBlock = document.createElement('div');
            progressBlock.classList.add('progress__block');

            const progressCircle = document.createElement('div');
            progressCircle.classList.add('progress__circle');

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '60');
            svg.setAttribute('height', '60');

            const backgroundCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            backgroundCircle.classList.add('background');
            svg.appendChild(backgroundCircle);

            const progressCirclePath = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            progressCirclePath.classList.add('progress');
            svg.appendChild(progressCirclePath);

            const progressText = document.createElement('div');
            progressText.classList.add('text');
            progressText.innerText = `${checklist.progress.current}/${checklist.progress.max}`;

            progressCircle.appendChild(svg);
            progressCircle.appendChild(progressText);

            const progressPercentage = (checklist.progress.current / checklist.progress.max) * 170;
            progressCirclePath.style.strokeDashoffset = 170 - progressPercentage;

            progressBlock.appendChild(progressCircle);

            const progressTextContainer = document.createElement('div');
            progressTextContainer.classList.add('progress__text');
            progressTextContainer.innerHTML = `
                <div style="display: flex; justify-content: start;">
                    <label class="progress__title">${checklist.title}</label>
                </div>
                <span>Выполнено: ${checklist.progress.current} из ${checklist.progress.max} действий</span>
                <p>Следующее действие: ${checklist.steps[checklist.progress.current] ? checklist.steps[checklist.progress.current].text : "Все действия выполнены"} до ${checklist.steps[checklist.progress.current] ? checklist.steps[checklist.progress.current].date : ""}</p>
            `;
            progressBlock.appendChild(progressTextContainer);

            const toggleButton = document.createElement('button');
            toggleButton.classList.add('btn');
            toggleButton.innerText = 'Открыть чеклист';
            toggleButton.onclick = () => {
                const isVisible = checklistItems.style.display === 'block';
                checklistItems.style.display = isVisible ? 'none' : 'block';
            };

            containerDiv.appendChild(progressBlock);
            containerDiv.appendChild(toggleButton);
            checklistDiv.appendChild(containerDiv);

            const checklistItems = document.createElement('div');
            checklistItems.style.display = 'none';

            checklist.steps.forEach((step, stepIndex) => {
                const checklistItem = document.createElement('div');
                checklistItem.classList.add('check-list__item');
                checklistItem.innerHTML = `
                    <input type="checkbox" id="item${checklistIndex}-${stepIndex}" />
                    <label for="item${checklistIndex}-${stepIndex}">${step.text} до ${step.date}</label>
                `;
                checklistItems.appendChild(checklistItem);
            });

            checklistDiv.appendChild(checklistItems);
            checklistContainer.appendChild(checklistDiv);
        });
    })
    .catch(error => console.error('Error loading data:', error));
