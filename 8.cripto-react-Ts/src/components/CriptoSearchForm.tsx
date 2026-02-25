
export default function CriptoSearchForm() {
    return(
        <form className="form">

            <div className="field">
                <label htmlFor="currency"></label>
                <select name="currency" id="currency">
                    <option value="">-- Seleccione --</option>
                </select>
            </div>


            <div className="field">
                <label htmlFor="criptocurrency"></label>
                <select name="criptocurrency" id="criptocurrency">
                    <option value="">-- Seleccione --</option>
                </select>
            </div>

            <input type="submit" value="Cotizar" />

        </form>
    )
}
