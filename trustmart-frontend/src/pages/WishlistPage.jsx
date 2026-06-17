function WishlistPage() {

    const items = [
        {
            id: 1,
            title: "iPhone 14",
            price: 80000
        },
        {
            id: 2,
            title: "MacBook Air",
            price: 120000
        }
    ];

    return (
        <div>
            <h1>Wishlist</h1>

            {items.map(item => (
                <div key={item.id}>
                    <h3>{item.title}</h3>
                    <p>Rs {item.price}</p>
                </div>
            ))}
        </div>
    );
}

export default WishlistPage;