import s from './LandingPage.module.scss'
import { Header } from '../../components/Header/Header';

import turtle from '../../assets/img/landing_turtle.png'
import tape from '../../assets/img/5d6b7ca01270f16cebded14c.png'
import { Tag } from '../../components/UI/Tag/Tag';

export const LandingPage = () => {
    return (
        <>
            <Header/>
            <main className={s.landingPage}>
                <section className={`section ${s.banner}`}>
                    <div className='container'>
                        <div className={s.banner__text}>
                            <h1>Как спасти черепах?</h1>
                            <p>
                                В желудочно-кишечном тракте одной зеленой морской черепахи, найденной у берегов Флориды,
                                ученые обнаружили 74 постаранних предмета.
                            </p>
                        </div>
                        <div className={s.banner__turtle}>
                            <img src={turtle} alt='Turtle'/>
                        </div>
                    </div>
                </section>
                <section className={`section ${s.top}`}>
                    <div className='container'>
                        <div className={s.top__img}>
                            <img src={tape} alt='Top image'/>
                        </div>
                        <div className={s.top__text}>
                            <Tag>Some text</Tag>
                            <h1>Привлечение потока лидов для оптового бизнеса одежды</h1>
                            <p>
                                Создавайте прототипы и дизайн лендинг пейдж просто копируя типовые блоки к себе в проект  и доработайте изображения
                            </p>

                        </div>

                    </div>
                </section>
            </main>
        </>
    )
}
