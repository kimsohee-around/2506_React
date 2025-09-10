import React, { useState } from "react";

const KakaoSearch = () => {
  const [query, setQuery] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [size, setSize] = useState(10);
  const [accuracy, setAccuracy] = useState(true);
  const [results, setResults] = useState(null);
  const [searchType, setSearchType] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const REST_API_KEY = "";

  const headers = {
    method: "GET",
    headers: {
      Authorization: `KakaoAK ${REST_API_KEY}`,
    },
  };

  const handleSearch = async (type) => {
    if (!query.trim()) {
      alert("검색어 입력은 필수입니다.");
      return;
    }

    setLoading(true);
    const sort = accuracy ? "accuracy" : "recency";
    let url = "";

    if (type === "vclip") {
      url = "https://dapi.kakao.com/v2/search/vclip";
    } else if (type === "image") {
      url = "https://dapi.kakao.com/v2/search/image";
    }

    try {
      const response = await fetch(
        `${url}?query=${encodeURIComponent(
          query
        )}&page=${pageNo}&size=${size}&sort=${sort}`,
        headers
      );

      if (!response.ok) {
        throw new Error("검색 요청에 실패했습니다.");
      }

      const data = await response.json();
      setResults(data.documents);
      setSearchType(type);
      setTotalCount(data.meta.total_count);
    } catch (error) {
      console.error("오류:", error);
      alert("검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const ImageItem = ({ item }) => (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="space-y-2 text-sm">
        <div>
          <strong>컬렉션:</strong> {item.collection}
        </div>
        <div>
          <strong>날짜:</strong> {item.datetime}
        </div>
        <div>
          <strong>사이트:</strong>{" "}
          <a
            href={item.doc_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {item.display_sitename}
          </a>
        </div>
        <div>
          <strong>크기:</strong> {item.width}px × {item.height}px
        </div>
        <div>
          <a
            href={item.image_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <img
              src={item.thumbnail_url}
              alt="검색 결과 이미지"
              className="w-full h-32 object-cover rounded border hover:opacity-80 transition-opacity"
            />
          </a>
        </div>
      </div>
    </div>
  );

  const VclipItem = ({ item }) => (
    <div
      className="border rounded-lg overflow-hidden bg-white shadow-sm"
      style={{ width: "180px", height: "300px" }}
    >
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <img
          src={item.thumbnail}
          alt={item.author}
          className="w-full h-32 object-cover hover:opacity-80 transition-opacity"
        />
      </a>
      <div className="p-3">
        <h6 className="font-semibold text-xs mb-2 line-clamp-2">
          {item.author}
        </h6>
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
          {item.title} ({item.play_time}초)
        </p>
        <p className="text-xs text-gray-500">
          {item.datetime.replace("T", " ").slice(0, -10)}
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Kakao 검색
      </h1>

      {/* 검색 폼 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              검색어
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색어를 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              페이지 번호
            </label>
            <input
              type="number"
              value={pageNo}
              onChange={(e) => setPageNo(parseInt(e.target.value) || 1)}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              페이지당 개수
            </label>
            <select
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={10}>10개</option>
              <option value={20}>20개</option>
              <option value={50}>50개</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              정렬 방식
            </label>
            <div className="flex items-center space-x-4 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={accuracy}
                  onChange={() => setAccuracy(true)}
                  className="mr-2"
                />
                <span className="text-sm">정확도순</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={!accuracy}
                  onChange={() => setAccuracy(false)}
                  className="mr-2"
                />
                <span className="text-sm">최신순</span>
              </label>
            </div>
          </div>
        </div>

        {/* 검색 버튼 */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleSearch("vclip")}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading && searchType === "vclip" ? "검색 중..." : "동영상 검색"}
          </button>
          <button
            onClick={() => handleSearch("image")}
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading && searchType === "image" ? "검색 중..." : "이미지 검색"}
          </button>
        </div>
      </div>

      {/* 검색 결과 카운트 */}
      {totalCount > 0 && (
        <div className="text-center mb-4">
          <span className="text-lg font-semibold text-gray-700">
            검색결과: {totalCount.toLocaleString()}개
          </span>
        </div>
      )}

      {/* 검색 결과 */}
      {results && results.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          {searchType === "image" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((item, index) => (
                <ImageItem key={index} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-5">
              {results.map((item, index) => (
                <VclipItem key={index} item={item} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 로딩 상태 */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">검색 중...</p>
        </div>
      )}

      {/* 검색 결과가 없을 때 */}
      {results && results.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default KakaoSearch;
