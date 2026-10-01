import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [categoria, setCategoria] = useState("");
    const [estoque, setEstoque] = useState(true);
    const [carregando, setCarregando] = useState(false);

    const API_KEY = "pro_9198188f7fe0f06cdc6ffaec77b61ac26652a459595f16d76435cbeab60c551e";

    async function adicionarProduto(event) {
        event.preventDefault();

        if (!nome || !preco || !categoria) {
            alert("Preencha todos os campos");
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

            console.log("Status:", resposta.status);
            console.log("Resposta:", dados);

            if (!resposta.ok) {
                alert(
                    "Erro " +
                    resposta.status +
                    ": " +
                    (dados.error || dados.message || "Erro ao adicionar produto")
                );
                return;
            }

            alert("Produto adicionado com sucesso!");

            setNome("");
            setPreco("");
            setCategoria("");
            setEstoque(true);

        } catch (erro) {
            console.log("Erro:", erro);
            alert("Erro ao conectar com a API");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 relative overflow-hidden">

            <div className="absolute w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30 -top-20 -left-20 animate-pulse"></div>

            <div className="absolute w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-30 -bottom-20 -right-20 animate-pulse"></div>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative z-10 animate-[cardEntrada_0.6s_ease-out]">

                <div className="text-center mb-8">

                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl animate-[flutuar_3s_ease-in-out_infinite]">
                        +
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Adicionar Produto
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Cadastre um novo produto
                    </p>

                </div>

                <form
                    onSubmit={adicionarProduto}
                    className="space-y-5"
                >

                    <div className="animate-[fadeIn_0.7s_ease-out]">

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

                    <div className="animate-[fadeIn_0.8s_ease-out]">

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

                    <div className="animate-[fadeIn_0.9s_ease-out]">

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
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 transition-all duration-300 disabled:bg-gray-400 disabled:hover:translate-y-0"
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

                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateX(-15px);
                        }

                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }

                    @keyframes flutuar {
                        0%, 100% {
                            transform: translateY(0);
                        }

                        50% {
                            transform: translateY(-6px);
                        }
                    }
                `}
            </style>

        </div>
    );
}

export default Products;

