const profileInfo = {
    id: 'Loading...',
    name: 'Loading...',
    about: 'Loading...',
    avatar: 'Loading...'
}

export default class Card {
    constructor({ cardId, name, link, imageDescription, owner, likes}, selector, handleCardClick, userId, like, dislike) {
        this._userId = userId;

        const { likeCount, isUserLiked, activeDelete } = this._initCardInfo({ likes, ownerId: owner._id })
        this.ownerId = owner._id;
        this._cardId = cardId;
        this._name = name;
        this._link = link;
        this._imageDescription = imageDescription;
        this._favorite = isUserLiked;
        this._likeCount = likeCount;
        this._activeDelete = activeDelete;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
        this._element = '';
        this._like = like;
        this._dislike = dislike;
    }

    createCardElement() {
        const card = document.querySelector(this._selector).content.cloneNode(true);
        this._updateCard(card, {
            cardId: this._cardId,
            name: this._name,
            link: this._link,
            imageDescription: this._imageDescription,
            favorite: this._favorite,
            likeCount: this._likeCount,
            activeDelete: this._activeDelete
        });

        this._setEventListeners();

        const button = this._element.querySelector('.element__button-like');
        button.addEventListener('click', this._toggleCardToFavorite, false);

        return this._element;
    }

    _updateCard(card, { cardId, name, link, imageDescription, favorite, likeCount, activeDelete }) {
        card.cardId = cardId;
        const cardImage = card.querySelector('.element__image');
        cardImage.src = link;
        cardImage.alt = imageDescription;

        card.querySelector('.element__name').textContent = name;

        const likeButton = card.querySelector('.element__button-like');
        if (this._favorite) {
            likeButton.classList.add('element__button-like_active');
        } else {
            likeButton.classList.remove('element__button-like_active');
        }

        const deleteButton = card.querySelector('.element__button-delete');
        if (this._activeDelete) {
            this._showDeleteCardButton(deleteButton);
        } else {
            this._hideDeleteCardButton(deleteButton);
        }

        const likes = card.querySelector('.element__count-like');
        likes.textContent = likeCount;

        this._element = card;
    };

    _toggleCardToFavorite(event) {
        const card = event.target.closest('.element');

        if (event.currentTarget.classList.contains('element__button-like_active')) {
                //TODO: Добавить API лайка
        } else {
                //TODO: Добавить API лайка
                console.log('dislike');
                this._dislike.bind(this);
        }
    }

    _initCardInfo({ likes, ownerId }) {
        const activeDelete = ownerId === this._userId;
        const likeCount = likes.length;
        const isUserLiked = likes.some(like => like._id === this._userId);
        return { likeCount, isUserLiked, activeDelete };
    }

    _hideDeleteCardButton(button) {
        button.classList.add('element__button-delete_disable');
    }

    _showDeleteCardButton(button) {
        button.classList.remove('element__button-delete_disable');
    }

    _deleteCardEvent = (event) => {
        const card = event.target.closest('.element');
        card.remove();
    }

    _setEventListeners() {
        const image = this._element.querySelector('.element__image');
        image.addEventListener('click', (event) => this._handleCardClick({ description: this._name, src: this._link }));

        const deleteButton = this._element.querySelector('.element__button-delete');
        deleteButton.addEventListener('click', (event) => this._deleteCardEvent(event));
    }
}