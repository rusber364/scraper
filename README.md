1. Установите зависимости, выполнив команду:
```bash
npm install
```
2. Запустите программу в режиме разработки с помощью команды:
```bash
npm run dev
```

3. Endpoints

    Поиск по названию песни
    ```
    Метод: GET
    Путь: /:search
    Описание: Поиск песни по названию.
    Пример: http://localhost:3000/Imagine
    ```

    Получение текста песни по ID
    ```
    Метод: GET
    Путь: /song/:id
    Описание: Получение текста песни по её уникальному идентификатору.
    Пример: http://localhost:3000/song/123
    ```

    Поиск по названию псалма
    ```
    Метод: GET
    Путь: /psalms/:search
    Описание: Поиск псалма по названию.
    Пример: http://localhost:3000/psalms/Благослови, душе, Господа
    ```

    Получение псалма по ID
    ```
    Метод: GET
    Путь: /psalms/song/:id
    Описание: Получение псалма по его уникальному идентификатору.
    Пример: http://localhost:3000/psalms/song/456
    ```

    Получение текстов всех песен по поиску
    ```
    Метод: GET
    Путь: /text/:search
    Описание: Получение текстов всех песен по поиску.
    Пример: http://localhost:3000/text/love
    ```
4. Генерирует URL для поиска на основе предоставленных параметров ввода.

    Параметры:

        input: SearchInput: Параметры ввода для поиска.
            text: string: Текст для поиска.
            title?: boolean: Включить поиск по названию (опционально).
            artist?: boolean: Включить поиск по исполнителю (опционально).
            lyrics?: boolean: Включить поиск по текстам (опционально).

    Пример использования:

    ```javascript
    const searchInput = {
        text: 'Imagine^1',
        title: true,
        artist: false,
        lyrics: true,
    };

    const searchUrl = createUrlToSearch(searchInput);
    // Результат: 'http://localhost:3000/psalms/Imagine?page=1'

    parseSearchResponseToList(response: string): Array<{ id: string, title: string, artist_or_author: string }>
    ```
    Преобразует JSON-ответ от запроса поиска в список песен.

    Параметры:

        response: string: JSON-ответ от запроса поиска.

    Возвращаемое значение:

    Массив объектов с информацией о песнях.
    Пример использования:

    ```javascript
    const jsonResponse = '[{"id": "123", "title": "Imagine", "author": "John Lennon"}]';
    const songList = parseSearchResponseToList(jsonResponse);
    // Результат: [{ id: '123', title: 'Imagine', artist_or_author: 'John Lennon' }]

    createUrlToGetById(id: string): string
    ```
    Создает URL для получения подробной информации о песне по её идентификатору.
    Параметры:

        id: string: Идентификатор песни.

    Пример использования:

    ```javascript
    const songId = '123';
    const songDetailsUrl = createUrlToGetById(songId);
    // Результат: 'http://localhost:3000/psalms/song/123'

    parseGetResponseToSong(response: string): { title: string, artist: string, author: string, lyrics: string }
    ```
    Преобразует JSON-ответ от запроса получения информации о песне в структурированные данные.
    Параметры:

        response: string: JSON-ответ от запроса получения информации о песне.

    Возвращаемое значение:

    Объект с подробной информацией о песне.
    Пример использования:

    ```javascript
    const jsonResponse = '{"title": "Imagine", "artist": "John Lennon", "author": "John Lennon", "lyrics": "..."}';
    const songDetails = parseGetResponseToSong(jsonResponse);
    // Результат: { title: 'Imagine', artist: 'John Lennon', author: 'John Lennon', lyrics: '...' }
    ```
