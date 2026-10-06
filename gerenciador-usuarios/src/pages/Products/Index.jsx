import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [categoria, setCategoria] = useState("");
    const [estoque, setEstoque] = useState(true);
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");
    const [mouse, setMouse] = useState({ x: 50, y: 50 });

    const API_KEY = "pro_9198188f7fe0f06cdc6ffaec77b61ac26652a459595f16d76435cbeab60c551e";

    useEffect(() => {
        function moverMouse(e) {
            setMouse({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        }

        window.addEventListener("mousemove", moverMouse);

        return () => {
            window.removeEventListener("mousemove", moverMouse);
        };
    }, []);

    async function adicionarProduto(event) {
        event.preventDefault();

        setMensagem("");

        if (!nome || !preco || !categoria) {
            setMensagem("Preencha todos os campos.");
            setTipoMensagem("erro");
            return;
        }

        setCarregando(true);

        const produto = {
            name: nome,
            price: Number(preco),
            category: categoria,
            in_stock: estoque
        };

        try {
            const resposta = await fetch(
                "https://reqres.in/api/collections/products/records?project_id=51113",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": API_KEY,
                        "X-Reqres-Env": "prod"
                    },
                    body: JSON.stringify({
                        data: produto
                    })
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                setMensagem(
                    dados.error ||
                    dados.message ||
                    "Não foi possível adicionar o produto."
                );

                setTipoMensagem("erro");
                return;
            }

            setMensagem("Produto adicionado com sucesso!");
            setTipoMensagem("sucesso");

            setNome("");
            setPreco("");
            setCategoria("");
            setEstoque(true);

        } catch (erro) {
            console.log(erro);

            setMensagem("Não foi possível conectar com a API.");
            setTipoMensagem("erro");

        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">

            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-60"
                style={{
                    backgroundImage: `
                        linear-gradient(
                            90deg,
                            rgba(59,130,246,0.12) 1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            0deg,
                            rgba(59,130,246,0.12) 1px,
                            transparent 1px
                        )
                    `,
                    backgroundSize: "55px 55px",
                    maskImage: `radial-gradient(
                        circle 500px at ${mouse.x}% ${mouse.y}%,
                        black,
                        transparent
                    )`,
                    WebkitMaskImage: `radial-gradient(
                        circle 500px at ${mouse.x}% ${mouse.y}%,
                        black,
                        transparent
                    )`
                }}
            />

            <div
                className="fixed pointer-events-none z-0 w-96 h-96 rounded-full"
                style={{
                    left: `${mouse.x}%`,
                    top: `${mouse.y}%`,
                    transform: "translate(-50%, -50%)",
                    background:
                        "radial-gradient(circle, rgba(59,130,246,0.10), transparent 70%)",
                    transition: "left 0.12s ease-out, top 0.12s ease-out"
                }}
            />

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative z-10 animate-[cardEntrada_0.6s_ease-out]">

                <div className="text-center mb-8">

                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
                        +
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Adicionar Produto
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Cadastre um novo produto
                    </p>

                </div>

                {mensagem && (
                    <div
                        className={`mb-5 px-4 py-3 rounded-lg text-sm font-medium ${
                            tipoMensagem === "sucesso"
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                    >
                        {mensagem}
                    </div>
                )}

                <form
                    onSubmit={adicionarProduto}
                    className="space-y-5"
                >

                    <div>

                        <label className="block text-gray-700 font-semibold mb-2">
                            Nome
                        </label>

                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Digite o nome do produto"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all duration-300"
                        />

                    </div>

                    <div>

                        <label className="block text-gray-700 font-semibold mb-2">
                            Preço
                        </label>

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                            placeholder="Digite o preço"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all duration-300"
                        />

                    </div>

                    <div>

                        <label className="block text-gray-700 font-semibold mb-2">
                            Categoria
                        </label>

                        <input
                            type="text"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            placeholder="Digite a categoria"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all duration-300"
                        />

                    </div>

                    <label className="flex items-center gap-3 cursor-pointer group">

                        <input
                            type="checkbox"
                            checked={estoque}
                            onChange={(e) => setEstoque(e.target.checked)}
                            className="w-5 h-5 accent-blue-600 cursor-pointer"
                        />

                        <span className="text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                            Produto disponível em estoque
                        </span>

                    </label>

                    <button
                        type="submit"
                        disabled={carregando}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 transition-all duration-300 disabled:bg-gray-400"
                    >
                        {carregando
                            ? "Adicionando..."
                            : "Adicionar produto"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/produtos")}
                        className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                    >
                        Ver produtos
                    </button>

                </form>

            </div>

            <style>
                {`
                    @keyframes cardEntrada {
                        from {
                            opacity: 0;
                            transform: translateY(30px) scale(0.95);
                        }

                        to {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }
                `}
            </style>

        </div>
    );
}

export default Products;

