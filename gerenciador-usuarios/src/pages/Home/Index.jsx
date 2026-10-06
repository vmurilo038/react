import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [pesquisa, setPesquisa] = useState("");
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

    async function buscarProdutos() {
        try {
            const resposta = await fetch(
                "https://reqres.in/api/collections/products/records?project_id=51113",
                {
                    method: "GET",
                    headers: {
                        "x-api-key": API_KEY,
                        "X-Reqres-Env": "prod"
                    }
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                return;
            }

            setProdutos(dados.data || dados.records || []);
        } catch (erro) {
            console.log(erro);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        buscarProdutos();
    }, []);

    const produtosFiltrados = produtos.filter((produto) => {
        const dados = produto.data || produto;

        return dados.name
            ?.toLowerCase()
            .includes(pesquisa.toLowerCase());
    });

    return (
        <div className="min-h-screen bg-slate-50 p-6 relative overflow-hidden">

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
                    )`,
                    transition: "mask-image 0.15s ease"
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

            <div className="relative z-10 max-w-5xl mx-auto">

                <div className="flex justify-between items-center mb-8 animate-[fadeIn_0.6s_ease-out]">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Lista de Produtos
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Produtos cadastrados
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                    >
                        + Adicionar produto
                    </button>

                </div>

                <div className="mb-6 animate-[fadeIn_0.8s_ease-out]">

                    <input
                        type="text"
                        placeholder="Pesquisar produto..."
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 outline-none shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    />

                </div>

                {carregando ? (

                    <div className="bg-white rounded-xl p-8 text-center shadow animate-pulse">
                        <p className="text-gray-500">
                            Carregando produtos...
                        </p>
                    </div>

                ) : produtosFiltrados.length === 0 ? (

                    <div className="bg-white rounded-xl p-8 text-center shadow animate-[fadeIn_0.5s_ease-out]">
                        <p className="text-gray-500">
                            Nenhum produto encontrado.
                        </p>
                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                        {produtosFiltrados.map((produto, index) => {

                            const dados = produto.data || produto;

                            return (
                                <div
                                    key={produto.id}
                                    style={{
                                        animationDelay: `${index * 100}ms`
                                    }}
                                    className="bg-white rounded-xl shadow p-6 opacity-0 animate-[cardEntrada_0.5s_ease-out_forwards] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                                >

                                    <div className="flex justify-between items-start mb-4">

                                        <h2 className="text-xl font-bold text-gray-800">
                                            {dados.name}
                                        </h2>

                                        <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></span>

                                    </div>

                                    <p className="text-gray-600 mb-2">
                                        <strong>Categoria:</strong>{" "}
                                        {dados.category}
                                    </p>

                                    <p className="text-2xl font-bold text-blue-600 mb-4">
                                        R$ {Number(dados.price).toFixed(2)}
                                    </p>

                                    <p>
                                        <strong>Estoque:</strong>{" "}

                                        <span
                                            className={
                                                dados.in_stock
                                                    ? "text-green-600 font-semibold"
                                                    : "text-red-600 font-semibold"
                                            }
                                        >
                                            {dados.in_stock
                                                ? "Disponível"
                                                : "Indisponível"}
                                        </span>
                                    </p>

                                </div>
                            );
                        })}

                    </div>
                )}

            </div>

            <style>
                {`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(-10px);
                        }

                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes cardEntrada {
                        from {
                            opacity: 0;
                            transform: translateY(25px) scale(0.97);
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

export default Home;

